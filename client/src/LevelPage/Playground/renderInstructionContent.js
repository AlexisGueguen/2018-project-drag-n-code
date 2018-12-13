import {instructions} from "./Instructions/instructions";
import {IfBlock, VariableDeclaration} from "./Instructions";
import React from "react";
import {ForLoop} from "./Instructions/ForLoop";
import {PrintInstruction} from "./Instructions/Print";

export function renderInstructionContent(item, update) {
    switch (item.type) {
        case instructions.VariableDeclaration:
            return <div className="instruction"><VariableDeclaration item={item} update={update}/></div>;
        case instructions.IfBlock:
            return <div className="instruction"><IfBlock item={item} update={update}/></div>;
        case instructions.ForLoop:
            return <div className="instruction"><ForLoop item={item} update={update}/></div>;
        case instructions.Print:
            return <div className="instruction"><PrintInstruction item={item} update={update}/></div>;
        default:
            return <div className="instruction-default">{item.attributes.title}</div>;
    }
}