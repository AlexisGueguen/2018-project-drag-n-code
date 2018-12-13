import {instructions} from "./Instructions/instructions";
import {generateGuid} from "../../_helpers/utils";
import {comparisonOperators, assignmentOperators, arithmeticOperators} from "./Instructions/operators";
import {variableType} from "./Instructions/types";
import {printType} from "./Instructions/Print";

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
                            operator: assignmentOperators.plusPlus,
                            value: "1"
                        }
                    },
                    children: [
                        {
                            id: generateGuid(),
                            type: instructions.VariableOperation,
                            droppable: false,
                            attributes: {
                                variable: "a",
                                left: "1",
                                operator: arithmeticOperators.addition,
                                right: "1",
                                assignmentOperator: assignmentOperators.equal
                            },
                            children: []
                        }
                    ]
                },
                {
                    id: generateGuid(),
                    type: instructions.Print,
                    droppable: false,
                    attributes: {
                        type: printType.text,
                        value: "Hello"
                    },
                    children: []
                }
            ]
        }
    ]
};