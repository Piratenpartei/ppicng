import LogoInterface from "./LogoInterface";

export default interface LogoGroupInterface {
    title: string
    excludeFromDesigns?: string[]
    logos: {[name: string]: LogoInterface}
}