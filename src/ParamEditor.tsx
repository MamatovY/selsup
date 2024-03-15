import React, { useState } from 'react';

interface Param {
    id: number;
    name: string;
    type: 'string';
}

interface ParamValue {
    paramId: number;
    value: string;
}

interface Model {
    paramValues: ParamValue[];
}

interface Props {
    params: Param[];
    model: Model;
}
interface State {
    model: Model;
}

class ParamEditor extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            model: props.model,
        };
    }

    public getModel = (): Model => {
        return this.state.model;
    };

    public render() {
        const { params } = this.props;

        return (
            <div>
                {params.map((param) => (
                    <div key={param.id}>
                        <label htmlFor={param.name}>{param.name}</label>
                        <input
                            type="text"
                            id={param.name}
                            value={this.getModel().paramValues.find((pv) => pv.paramId === param.id)?.value}
                            onChange={(event) => {
                                const paramValue = {
                                    paramId: param.id,
                                    value: event.target.value,
                                };

                                const newModel = {
                                    ...this.getModel(),
                                    paramValues: this.getModel().paramValues.filter((pv) => pv.paramId !== param.id).concat([paramValue]),
                                };

                                this.setState({ model: newModel });
                            }}
                        />
                    </div>
                ))}
            </div>
        );
    }
}

export default ParamEditor;