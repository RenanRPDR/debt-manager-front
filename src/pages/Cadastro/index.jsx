import React, { Component } from 'react';

import DebtsApi from '../../service/DebtsApi'
import './styles.css'

const debtsApi = new DebtsApi() 

class Cadastro extends Component{
  constructor(props) {
    super(props)
  }
  
  state = {users: [{}], debts: []}
  
  componentDidMount = async() => {
    this.refreshData()
  }
  
  async refreshData() {
    const debts = debtsApi.listDebts()
    const request = await fetch('http://localhost:4444/users');
    const users = request.json();
    
    this.setState({
      debts: await debts,
      users: await users
    })
  }

  submitForm = async function (params) {
  
    const payload = {
      "user": {
        "id": this.refs.user.value,
        "name": this.refs.user.selectedOptions[0].innerText
      },
      "debtName": this.refs.debtName.value,
      "value": this.refs.value.value,
      "date": this.refs.date.value
      }

    await debtsApi.create(payload);
    this.refreshData();
  }

  loadDebt(debitId) {
    console.log(debitId)     
  }
  
  listDebts() {
    return this.state.debts.map(debt =>
      <div className="listDebtsResults" onClick={()=>this.loadDebt(debt.id)}>
        {debt.user.name} R$:{debt.value}
      </div>);
  }

  cleanForm() {
    // Escrever uma funcao para limpar ou inserir coisas vazias no formulario
  }
  
  render() {
    return (
      <div className="grid-container">          
          <div className="Content">          
            <div className="Historic">
              <h2 className="historicTitle">Histórico</h2><br/>{this.listDebts()}
            </div>              
              <div class="Register">                
                <h2 className="registerTitle">Cadastro de dívida</h2><br/>
                <form >
                  
                  Pessoas
                  <div>
                    <select ref="user" name="user">
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
                  <input className="eraseButton"onClick={()=>this.deleteForm()} type="submit" value="Excluir"/>
                  <input className="saveButton"onClick={()=>this.submitForm()} type="submit" value="Salvar"/>                                    
                </div>   
                <button className="newDebit" onClick="">Cadastrar nova dívida</button>
              </div>
            </div>
        <div class="Header">
          <h1 className="debtManager">Debt Manager</h1>
        </div>
        <div class="Footer">
        </div>
        
      </div>      
    ) 
  }
}

export default Cadastro;