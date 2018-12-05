import {instructions} from "./instructions";
import {VariableDeclaration} from "./VariableDeclaration";
import {IfBlock} from "./IfBlock";
import {ForLoop} from "./ForLoop";

export function createIntsructionFromType(type) {
    switch (type) {
        case instructions.VariableDeclaration:
            return VariableDeclaration.createInstruction();
        case instructions.IfBlock:
            return IfBlock.createInstruction();
        case instructions.ForLoop:
            return ForLoop.createInstruction();
        default:
            throw new Error(`Unkown instruction type ${type}`);
    }
}