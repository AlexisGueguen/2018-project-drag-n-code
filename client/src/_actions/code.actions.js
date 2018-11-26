import {codeConstants} from "../_constants";
import {instructions} from "../LevelPage/Instructions/instructions";
import {VariableDeclaration} from "../LevelPage/Instructions";

export const codeActions = {
    init,
    addInstruction,
    removeInstruction,
    moveInstruction,
    updateInstruction
};

function init() {
    return {type: codeConstants.INIT_CODE}
}

function addInstruction(code, source, destination, type) {
    const instr = createInstructionFromId(type);
    code.splice(destination.index, 0, instr);
    return { type: codeConstants.ADD_INSTRUCTION, code }
}

function removeInstruction(code) {
    return { type: codeConstants.REMOVE_INSTRUCTION, code };
}

function moveInstruction(code, source, destination, instructionId) {
    //const newCode = Array.from(this.state.code);
    const instruction = code[source.index];
    code.splice(source.index, 1);
    code.splice(destination.index, 0, instruction);
    return { type: codeConstants.MOVE_INSTRUCTION, code };
}

function updateInstruction(code, instr) {
    console.log("Update instruction");
    const index = code.findIndex(x=>x.id === instr.id);
    console.log(`instruction index : ${index}`);
    code[index] = instr;
    return { type: codeConstants.UPDATE_INSTRUCTION, code}
}

function createInstructionFromId(id) {
    let instruction;
    switch (id) {
        case instructions.VariableDeclaration:
            instruction = VariableDeclaration.createInstruction();
            break;
        default:
            throw new Error("Instruction with the id {id} is unrecognized by the system.");
    }
    return instruction;
}

