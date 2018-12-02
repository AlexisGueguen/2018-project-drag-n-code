import {instructions} from "./Instructions/instructions";
import {IfBlock, VariableDeclaration} from "./Instructions";
import React from "react";

export function renderInstructionContent(item, update) {
    switch (item.type) {
        case instructions.VariableDeclaration:
            return <div className="instruction"><VariableDeclaration item={item} update={update}/></div>;
        case instructions.IfBlock:
            return <div className="instruction"><IfBlock item={item} update={update}/></div>;
        default:
            return <div className="instruction">{item.attributes.title}</div>;
    }
}