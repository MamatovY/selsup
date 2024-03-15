import React from 'react';

interface Param {
  id: number;
  name: string;
  type: 'string';
}

interface ParamValue {
  paramId: number;
  value: string;
}

interface Color {
  id: number;
  name: string;
  code: string;
}

interface Model {
  paramValues: ParamValue[];
  colors: Color[];
}

interface Props {
  params: Param[];
  model: Model;
}

interface State {
  editedParams: ParamValue[];
}

class ParamEditor extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      editedParams: props.model.paramValues,
    };
  }


  updateParamValue = (paramId: number, value: string) => {
    this.setState((prevState) => ({
      editedParams: prevState.editedParams.map((param) =>
        param.paramId === paramId ? { ...param, value } : param
      ),
    }));
  };


  getModel(): Model {
    return {
      paramValues: this.state.editedParams,
      colors: this.props.model.colors,
    };
  }

  render() {
    const { params } = this.props;
    const { editedParams } = this.state;

    return (
      <div>
        <h2>Edit Model</h2>
        {params.map((param) => (
          <div key={param.id}>
            <label htmlFor={`param-${param.id}`}>{param.name}:</label>
            <input
              type="text"
              id={`param-${param.id}`}
              value={
                editedParams.find((p) => p.paramId === param.id)?.value || ''
              }
              onChange={(e) => this.updateParamValue(param.id, e.target.value)}
            />
          </div>
        ))}
      </div>
    );
  }
}


const params: Param[] = [
  {
    id: 1,
    name: 'Назначение',
    type: 'string',
  },
  {
    id: 2,
    name: 'Длина',
    type: 'string',
  },
];

const model: Model = {
  paramValues: [
    {
      paramId: 1,
      value: 'повседневное',
    },
    {
      paramId: 2,
      value: 'макси',
    },
  ],
  colors: [],
};

const App: React.FC = () => {
  return (
    <div>
      <ParamEditor params={params} model={model} />
    </div>
  );
};

export default App;
