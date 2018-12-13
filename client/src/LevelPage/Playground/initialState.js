import {instructions} from "./Instructions/instructions";
import {generateGuid} from "../../_helpers/utils";
import {comparisonOperators, operators} from "./Instructions/operators";
import {variableType} from "./Instructions/types";

export const initialState = {
    tree: [
        {
            id: generateGuid(),
            type: instructions.VariableDeclaration,
            droppable: false,
            attributes: {
                type: variableType.int,
                name: "a",
                value: "0"
            },
            children: []
        },
        {
            id: generateGuid(),
            type: instructions.IfBlock,
            droppable: true,
            attributes: {
                predicates: [
                    {
                        left: "odajj",
                        right: "e",
                        operator: comparisonOperators.equal,
                        aggregator: null
                    }
                ]
            },
            children: [
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
                            right: "1",
                            operator: comparisonOperators.lessOrEqualThan,
                        },
                        increment: {
                            variable: "i",
                            operator: operators.plusplus,
                            value: ""
                        }
                    },
                    children: [
                        {
                            id: generateGuid(),
                            type: instructions.VariableDeclaration,
                            droppable: false,
                            attributes: {
                                type: variableType.float,
                                name: "b",
                                value: "0.00"
                            },
                            children: []
                        }
                    ]
                },
                {
                    id: generateGuid(),
                    type: instructions.VariableDeclaration,
                    droppable: false,
                    attributes: {
                        type: variableType.double,
                        name: "c",
                        value: "0.08729"
                    },
                    children: []
                }
            ]
        }
    ]
};