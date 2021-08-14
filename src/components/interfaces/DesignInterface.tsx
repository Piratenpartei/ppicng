import { ImagePreviewProps } from "../ImagePreview";
import LogoInterface from "./LogoInterface";

export default interface DesignInterface {
  title: string;
  menuSchema: Object;
  menuSchemaUI?: Object;
  Image: React.FC<ImagePreviewProps>;
  fontFamilies?: string[];
  logoActive?: boolean;
  advancedOptionsAvailable?: boolean;
}
