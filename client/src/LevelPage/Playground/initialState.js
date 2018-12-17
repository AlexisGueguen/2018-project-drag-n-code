import {instructions} from "./Instructions/instructions";
import {generateGuid} from "../../_helpers/utils";
import {comparisonOperators, assignmentOperators} from "./Instructions/operators";
import {printType} from "./Instructions/Print";

export const initialState = {
    tree: [
        {
            id: generateGuid(),
            type: instructions.ForLoop,
            droppable: true,
            attributes: {
                initialization: {
                    type: "int",
                    name: "i",
                    value: "0"
                },
                condition: {
                    left: "i",
                    right: "inputs.size()",
                    operator: comparisonOperators.lessThan,
                },
                increment: {
                    variable: "i",
                    operator: assignmentOperators.plusPlus,
                    value: "1"
                }
            },
            children: [
                {
                    id: generateGuid(),
                    type: instructions.Print,
                    droppable: false,
                    attributes: {
                        type: printType.variable,
                        value: "inputs[i]"
                    },
                    children: []
                }
            ]
        },
    ]
};