import React from 'react';
import ReactDOM from 'react-dom';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

class Ingredient {
  constructor(opts) {
    this.id = new Date().toTimeString();
    this.word = opts ? (opts.word || '') : '';
    this.definition = opts ? (opts.definition || '') : '';
  }
}

class DataService {
  get items() {
    return this._ingredients;
  };

  constructor() {
    this._ingredients = [];
    this.ingredients = new BehaviorSubject(null);
  }

  addIngredient(ingredient) {
    if(!ingredient || !(ingredient instanceof Ingredient)) return;

    this._ingredients.push(ingredient);
    this.ingredients.next(this._ingredients);
  }
}


class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = new Ingredient();
    this.dataSvc = this.props.dataService;

    this.handleDefinitionChange = this.handleDefinitionChange.bind(this);
    this.handleWordChange = this.handleWordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleDefinitionChange(e) {
    this.setState({
      definition: e.target.value
    });
  }

  handleWordChange(e) {
    this.setState({
      word: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.dataSvc.addIngredient(new Ingredient(this.state));
    this.setState(new Ingredient());
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="field">
          <label htmlFor="word">Word</label>
          <input type="text" required value={this.state.word} onChange={this.handleWordChange} />
        </div>
        <div className="field">
          <label htmlFor="definition">Definition</label>
          <input type="text" required value={this.state.definition} onChange={this.handleDefinitionChange} />
        </div>
        <ul className="actions">
          <li><button type="submit">Add Ingredient</button></li>
        </ul>
      </form>
    );
  }
}

class Table extends React.Component {
  constructor(props) {
    super(props);

    this.dataSvc = this.props.dataService;

    this.state = {
      items: []
    };

    this.ingredients$ = null;
  }

  componentDidMount() {
    this.ingredients$ = this.dataSvc.ingredients.subscribe((ingredients) => {
      if(!ingredients) {
        this.setState({
          items: []
        });
  
        return;
      }

      let dl = ingredients.reduce((newAr, item) => {
        return newAr.concat([
          <dt key={`def-${item.id}`} className="draggable" draggable="true">
            <span className="icon style2 fa-arrows-v"></span>
            {item.word}
          </dt>,
          <dd key={`term-${item.id}`}>{item.definition}</dd>
        ]);
      }, []);
      
      this.setState({
        items: dl
      });
    });
  }

  componentWillUnmount() {
    this.ingredients$.unsubscribe();
  }

  render() {
    return (
      <dl>
        {this.state.items}
      </dl>
    );
  }
}

let dataservice = new DataService();

ReactDOM.render(
  <Form dataService={dataservice} />,
  document.getElementById('ingredientsForm')
);

ReactDOM.render(
  <Table dataService={dataservice} items={dataservice.items} />,
  document.getElementById('ingredientsList')
);