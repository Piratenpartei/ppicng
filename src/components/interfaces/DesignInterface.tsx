import { ImagePreviewProps } from "../ImagePreview";

export default interface DesignInterface {
  title: string;
  menuSchema: Object;
  menuSchemaUI?: Object;
  Image: React.FC<ImagePreviewProps>;
  fontFamilies?: string[];
}
