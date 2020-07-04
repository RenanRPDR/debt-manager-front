import React, { Component } from 'react';

import DebtsApi from '../../service/DebtsApi'
import './styles.css'

const debtsApi = new DebtsApi() 

class Cadastro extends Component{
  constructor(props) {
    super(props)
  };
  
  state = {users: [{}], debts: []}
  
  componentDidMount = async() => {
    this.refreshData()
  };
  
  async refreshData() {
    const debts = debtsApi.listDebts()
    const request = await fetch('http://localhost:4444/users');
    const users = request.json();
    
    this.setState({
      debts: await debts,
      users: await users
    })
  };

  submitForm = async function (params) {
    
    if (!this.refs.user.value || !this.refs.debtName.value || !this.refs.value.value || ! this.refs.date.value) {
      this.setState({message: 'Todos os campos são obrigatórios.'})
      return;
    }

    if (this.refs.value.value <= 0) {
      this.setState({message: 'O valor da dívida precisa ser maior que 0.'});
      return;
    }

    const payload = {
      "id": this.refs.id.value,
      "user": {
        "id": this.refs.user.value,
        "name": this.refs.user.selectedOptions[0].innerText
      },
      "debtName": this.refs.debtName.value,
      "value": this.refs.value.value,
      "date": this.refs.date.value
    };
    
    if (!payload.id) {    
      await debtsApi.create(payload);
    } else {
      await debtsApi.update(payload);
    }
    this.state.message = 'A dívida foi salva com sucesso! 😁️';
    this.refreshData();
    this.cleanForm();
    } 
  
    
    
  loadDebt(debt) {
    this.refs.id.value = debt.id
    this.refs.user.value = debt.user.id
    this.refs.debtName.value = debt.debtName
    this.refs.value.value = debt.value
    this.refs.date.value = debt.date
  }
    
  listDebts() {
    return this.state.debts.filter(debt => debt != null).map(debt =>
      <div className="listDebtsResults" onClick={()=>this.loadDebt(debt)}>
      {debt.user.name} R$:{debt.value}
    </div>);
  }

  listUserDebts() {
    return this.state.debts.filter(
      debt => debt != null && debt.user.id == this.refs.user.value).map(
      debt => <div className="listDebtsResults" onClick={()=>this.loadDebt(debt)}>
      {debt.user.name} R$:{debt.value}
    </div>);
  }
  
  deleteDebt = async function (params) {    
    const payload = {"id": this.refs.id.value}
    await debtsApi.delete(payload);
    this.state.message = 'A dívida foi apagada com sucesso!';
    this.refreshData();
    this.cleanForm();
  }

  cleanForm() {
    this.refs.id.value = null
    this.refs.user.value = null
    this.refs.debtName.value = null
    this.refs.value.value = null
    this.refs.date.value = null
  }
  
  render() {
    return (
      <div className="grid-container">          
          <div className="Content">          
            <h2 className="TitleHistoric">Histórico</h2>
              <div className="Historic">{this.listDebts()}
            </div>              
              <h2 className="TitleRegister">Cadastro de dívida</h2><br/>
                <div className="Register">                
                <form >
                    <input ref="id" type="hidden" name="id"/>
                  
                  Pessoas
                  <div>
                    <select ref="user" name="user" onChange={()=>this.setState({})} >
                      {this.state.users.map(user => <option value={user.id}>{user.name}</option>)}
                    </select>
                  </div>
                  <br/>                  
                  
                  Motivo
                  <div>
                    <label>
                      <input ref="debtName"type="text" name="debtName"/>
                    </label>
                  </div>
                  <br/>                
                
                  Valor
                  <div>
                    <label>
                      <input ref="value" type="number" name="value"/>
                    </label>
                  </div>
                  <br/>
                  
                  Data
                  <div>
                    <label>
                      <input ref="date" type="date" name="value"/>
                    </label>
                  </div>

                </form>
                <br/>                              
                <div className="buttons">
                  <input className="eraseButton"onClick={()=>this.deleteDebt()} type="submit" value="Excluir"/>
                  <input className="saveButton"onClick={()=>this.submitForm()} type="submit" value="Salvar"/>                                    
                </div>   
                <button className="newDebit" onClick={()=>this.cleanForm()}>Cadastrar nova dívida</button>
              </div>
                <h2 className="TitleUserHistoric">Histórico de usuário</h2>
                <div className="UserHistoric">{this.listUserDebts()}</div>
            </div>
        <div className="Header">
          <h1 className="debtManager">Debt Manager</h1>
        </div>
        <div className="Footer">
          <span className="operationMessage">{this.state.message}</span>
        </div>
        
      </div>      
    ) 
  }
}

export default Cadastro;