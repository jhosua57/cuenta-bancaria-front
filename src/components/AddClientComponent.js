import React, { useEffect, useState } from "react";
import ClientService from "../services/ClientService";
import { Link, useNavigate, useParams } from "react-router-dom";


export const AddClientComponent = () => {
  const [name, setName] = useState("");
  const [paternal, setPaternal] = useState("");
  const [maternal, setMaternal] = useState("");
  const [typedocument, setTypedocument] = useState("");
  const [documentidentity, setDocumentidentity] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [gender, setGender] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  const saveOrUpdateClient = (e) => {
    e.preventDefault();
    const client = {name, paternal, maternal, typedocument, documentidentity, birthdate, gender};
    if (id) {
        ClientService.updateClient(id, client).then((response) => {
          console.log(response.data);
          navigate('/clientes');
        }).catch(error => {
          console.log(error);
        })
    }else{
        ClientService.createClient(client).then((response) => {
            console.log(response.data);
            navigate('/clientes');
          }).catch(error => {
            console.log(error);
          })
    }

  };

  useEffect(() => {
    
    ClientService.getClientById(id).then((response) => {
      setName(response.data.name);
      setPaternal(response.data.paternal);
      setMaternal(response.data.maternal);
      setTypedocument(response.data.typedocument);
      setDocumentidentity(response.data.documentidentity);
      setBirthdate(response.data.birthdate);
      setGender(response.data.gender);
    }).catch(error => {
      console.log(error);
    })
  },[])

  const title = () => {
    if (id) {
      return <h2 className="text-center">Editar cliente</h2>
    } else {
      return <h2 className="text-center">Registrar cliente</h2>
    }
  }

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3">
            <h2 className="text-center"> {title()} </h2>
            <div className="card-body">
              <form>
                <div className="form-group mb-2">
                  <label className="form-label">Nombre: </label>
                  <input
                    placeholder="Nombre"
                    name="name"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Apellido Paterno: </label>
                  <input
                    placeholder="Apellido Paterno"
                    name="paternal"
                    className="form-control"
                    value={paternal}
                    onChange={(e) => setPaternal(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Apellido Materno: </label>
                  <input
                    placeholder="Apellido Materno"
                    name="maternal"
                    className="form-control"
                    value={maternal}
                    onChange={(e) => setMaternal(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Tipo de Documento: </label>
                  <select className="form-select" aria-label="Default select example"
                    name="typedocument"
                    value={typedocument}
                    onChange={(e) => setTypedocument(e.target.value)}
                    required>

                    <option defaultValue={""}>--Seleccione el documento--</option>
                    <option value="Carnet de Identidad">Carnet de Identidad</option>
                    <option value="Pasaporte">Pasaporte</option>
                    <option value="Carnet de Extranjería">Carnet de Extranjería</option>
                  </select>
                  
                </div>
                <div className="form-group">
                  <label className="form-label">Numero de Documento: </label>
                  <input
                    placeholder="Numero de Documento"
                    name="documentidentity"
                    className="form-control"
                    value={documentidentity}
                    onChange={(e) => setDocumentidentity(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Fecha de Nacimiento: </label>
                  <input
                    type="date"
                    placeholder="Fecha de Nacimiento"
                    name="birthdate"
                    className="form-control"
                    value={birthdate}
                    onChange={(e) => setBirthdate(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Género: </label>
                  <select className="form-select" aria-label="Default select example"
                    name="gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    required>
                        
                    <option defaultValue={""}>Seleccione el género</option>
                    <option value="Carnet de Identidad">Masculino</option>
                    <option value="Pasaporte">Femenino</option>
                    <option value="Carnet de Extranjería">Otro</option>
                  </select>
                  
                </div>
                <button className="btn btn-success" onClick={(e) => saveOrUpdateClient(e)}>Registrar</button>
                &nbsp;&nbsp;
                <Link to="/clientes" className="btn btn-danger">Cancelar</Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddClientComponent;
