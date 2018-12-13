import {instructions} from "./instructions";
import {VariableDeclaration} from "./VariableDeclaration";
import {IfBlock} from "./IfBlock";
import {ForLoop} from "./ForLoop";
import {PrintInstruction} from "./Print";
import {VariableOperation} from "./VariableOperation";

export function createInstructionFromType(type) {
    switch (type) {
        case instructions.VariableDeclaration:
            return VariableDeclaration.createInstruction();
        case instructions.IfBlock:
            return IfBlock.createInstruction();
        case instructions.ForLoop:
            return ForLoop.createInstruction();
        case instructions.Print:
            return PrintInstruction.createInstruction();
        case instructions.VariableOperation:
            return VariableOperation.createInstruction();
        default:
            throw new Error(`Unkown instruction type ${type}`);
    }
}