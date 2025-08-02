import React, { useState, useRef, useCallback } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Upload, CheckCircle, XCircle, Edit, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { pipeline, env } from '@huggingface/transformers';

// Configure transformers.js
env.allowLocalModels = false;
env.useBrowserCache = false;

export interface RoomElement {
  id: string;
  type: 'walls' | 'wainscoting' | 'window_trim' | 'ceiling' | 'ceiling_trim' | 'flooring' | 'floor_trim' | 'appliances';
  mask: ImageData;
  confidence: number;
  confirmed: boolean;
  color?: string;
}

interface ImageSegmentationProps {
  onElementsDetected: (elements: RoomElement[]) => void;
  onImageUploaded: (imageUrl: string) => void;
}

export const ImageSegmentation: React.FC<ImageSegmentationProps> = ({
  onElementsDetected,
  onImageUploaded,
}) => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [detectedElements, setDetectedElements] = useState<RoomElement[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const elementTypeLabels = {
    walls: 'Walls',
    wainscoting: 'Wainscoting', 
    window_trim: 'Window Trim',
    ceiling: 'Ceiling',
    ceiling_trim: 'Ceiling Trim',
    flooring: 'Flooring',
    floor_trim: 'Floor Trim',
    appliances: 'Appliances'
  };

  const handleFileSelect = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const imageUrl = URL.createObjectURL(file);
      setUploadedImage(imageUrl);
      onImageUploaded(imageUrl);
      
      // Auto-process the image
      processImage(file);
    }
  }, [onImageUploaded]);

  const processImage = useCallback(async (file: File) => {
    if (!file) return;

    setIsProcessing(true);
    toast.info('Processing image to identify room elements...');

    try {
      // Create image element
      const img = new Image();
      const imageUrl = URL.createObjectURL(file);
      
      img.onload = async () => {
        try {
          // Set up canvas
          const canvas = canvasRef.current;
          if (!canvas) throw new Error('Canvas not available');
          
          const ctx = canvas.getContext('2d');
          if (!ctx) throw new Error('Canvas context not available');

          // Resize image for processing (max 1024px)
          const maxDim = 1024;
          let { width, height } = img;
          
          if (width > maxDim || height > maxDim) {
            if (width > height) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            } else {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
          }

          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0, width, height);

          // Load segmentation model
          const segmenter = await pipeline(
            'image-segmentation', 
            'Xenova/segformer-b0-finetuned-ade-512-512',
            { device: 'webgpu' }
          );

          // Convert canvas to base64 for processing
          const imageData = canvas.toDataURL('image/jpeg', 0.8);
          
          // Process with segmentation model
          const result = await segmenter(imageData);
          
          if (!result || !Array.isArray(result)) {
            throw new Error('Invalid segmentation result');
          }

          // Map segmentation results to room elements
          const mappedElements: RoomElement[] = result
            .map((segment: any, index: number) => {
              const elementType = mapLabelToElementType(segment.label);
              if (!elementType) return null;

              return {
                id: `element-${index}`,
                type: elementType,
                mask: segment.mask,
                confidence: segment.score || 0.8,
                confirmed: false,
              };
            })
            .filter(Boolean) as RoomElement[];

          setDetectedElements(mappedElements);
          onElementsDetected(mappedElements);
          
          toast.success(`Detected ${mappedElements.length} room elements. Please confirm the identifications.`);
          
        } catch (error) {
          console.error('Error processing image:', error);
          toast.error('Failed to process image. Please try again.');
        } finally {
          setIsProcessing(false);
          URL.revokeObjectURL(imageUrl);
        }
      };

      img.onerror = () => {
        toast.error('Failed to load image');
        setIsProcessing(false);
        URL.revokeObjectURL(imageUrl);
      };

      img.src = imageUrl;

    } catch (error) {
      console.error('Error in image processing:', error);
      toast.error('Failed to process image');
      setIsProcessing(false);
    }
  }, [onElementsDetected]);

  const mapLabelToElementType = (label: string): RoomElement['type'] | null => {
    const labelLower = label.toLowerCase();
    
    if (labelLower.includes('wall')) return 'walls';
    if (labelLower.includes('wainscot')) return 'wainscoting';
    if (labelLower.includes('window') || labelLower.includes('trim')) return 'window_trim';
    if (labelLower.includes('ceiling')) return 'ceiling';
    if (labelLower.includes('floor')) return 'flooring';
    if (labelLower.includes('appliance') || labelLower.includes('cabinet')) return 'appliances';
    
    return null;
  };

  const confirmElement = useCallback((elementId: string, confirmed: boolean) => {
    setDetectedElements(prev => 
      prev.map(element => 
        element.id === elementId 
          ? { ...element, confirmed }
          : element
      )
    );
  }, []);

  const updateElementType = useCallback((elementId: string, newType: RoomElement['type']) => {
    setDetectedElements(prev => 
      prev.map(element => 
        element.id === elementId 
          ? { ...element, type: newType }
          : element
      )
    );
  }, []);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-4">
      <Card className="shadow-elegant">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="w-5 h-5" />
            Upload & Analyze Room Photo
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {!uploadedImage ? (
            <div 
              className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center cursor-pointer hover:border-primary/50 transition-colors"
              onClick={handleUploadClick}
            >
              <Upload className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-lg font-medium mb-2">Drop your room photo here</p>
              <p className="text-muted-foreground mb-4">Upload a photo to automatically identify walls, trim, and other elements</p>
              <Button className="bg-gradient-to-r from-primary to-accent text-primary-foreground">
                Choose Photo
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>
          ) : (
            <div className="space-y-4">
              <div className="relative">
                <img 
                  src={uploadedImage} 
                  alt="Uploaded room" 
                  className="w-full h-auto rounded-lg"
                />
                {isProcessing && (
                  <div className="absolute inset-0 bg-background/80 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2" />
                      <p className="text-sm">Analyzing room elements...</p>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  onClick={handleUploadClick}
                  size="sm"
                >
                  Upload Different Photo
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => selectedFile && processImage(selectedFile)}
                  disabled={isProcessing}
                  size="sm"
                >
                  Re-analyze
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {detectedElements.length > 0 && (
        <Card className="shadow-elegant">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Edit className="w-5 h-5" />
              Confirm Detected Elements
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground mb-4">
              Please confirm or correct the identified room elements below:
            </p>
            
            {detectedElements.map((element) => (
              <div key={element.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Badge variant={element.confirmed ? "default" : "secondary"}>
                    {elementTypeLabels[element.type]}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    {Math.round(element.confidence * 100)}% confidence
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  <select
                    value={element.type}
                    onChange={(e) => updateElementType(element.id, e.target.value as RoomElement['type'])}
                    className="text-xs border rounded px-2 py-1"
                  >
                    {Object.entries(elementTypeLabels).map(([value, label]) => (
                      <option key={value} value={value}>{label}</option>
                    ))}
                  </select>
                  
                  <Button
                    variant={element.confirmed ? "default" : "outline"}
                    size="sm"
                    onClick={() => confirmElement(element.id, !element.confirmed)}
                  >
                    {element.confirmed ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <XCircle className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>
            ))}
            
            <div className="pt-3 border-t">
              <Button 
                className="w-full bg-gradient-to-r from-primary to-accent text-primary-foreground"
                disabled={detectedElements.filter(e => e.confirmed).length === 0}
              >
                Confirm All & Continue to Color Selection
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};