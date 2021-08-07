import LogoInterface from "./LogoInterface";

export default interface LogoGroupInterface {
    title: string
    logos: {[name: string]: LogoInterface}
}