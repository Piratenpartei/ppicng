export default interface LogoInterface {
  default: string;
  title: string;
  groups?: string[];
  variants?: { [x: string]: string };
}
