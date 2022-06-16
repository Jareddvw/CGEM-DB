import { useState, useEffect, useContext } from 'react'
import { useMatch } from 'react-router-dom'
import { Container, Table, Row, Card } from 'react-bootstrap'
import MonomerDrawing from '../components/rxn_page_components/MonomerDrawing'
import FlexOrSynthInfo from '../components/rxn_page_components/FlexOrSynthInfo'
import RibosomeInfo from '../components/rxn_page_components/RibosomeInfo'
import MicrohelixAssay from '../components/rxn_page_components/MicrohelixAssay'
import Trna_info from '../components/rxn_page_components/Trna_info'
import References from '../components/rxn_page_components/References'
import EditModal from '../components/rxn_page_components/modals/EditModal'
import DeleteModal from '../components/rxn_page_components/modals/DeleteModal'
import UnauthModal from '../components/rxn_page_components/modals/UnauthModal'
import AuthContext from '../context/AuthContext'

const ReactionPage = () => {
    
    const match = useMatch({
        path: "/reaction/:id/",
        strict: true,
        sensitive: true,
      });

    const id = match.params.id

    let [reaction, setReaction] = useState({})
    let [height, setHeight] = useState(150)
    let [loading, setLoading] = useState(true)
    let [status, setStatus] = useState(0)
    let [showUnauthorizedModal, setShowUnauthorizedModal] = useState(false)
    let [showDeleteModal, setShowDeleteModal] = useState(false)
    let [showEditModal, setShowEditModal] = useState(false)

    let {authTokens, user} = useContext(AuthContext)

    useEffect(() => {
        getReaction()
    }, [])

    useEffect(() => {
        if (reaction && Object.keys(reaction).length > 1) {
            setLoading(false)
        }
    }, [reaction])

    useEffect(() => {
        if (document.getElementById('figRow')) {
            const h = document.getElementById('figRow').clientHeight;
            setHeight(h - 50)
        }
    }, [loading])

    let getReaction = async () => {
        let response = await fetch(`/api/single/${id}`)
        if (response.status === 500) {
            console.log("Error connecting to server to fetch reaction" +
                        "info (server may not be running).") 
            setStatus(500)
        } else if (response.status >= 404) {
            console.log("reaction not found.")
            setStatus(response.status)
        } else {
            let data = await response.json()
            setReaction(data)
        }
    }

    if (!loading) {
   return (
    <Container className = "mb-3">
        <Row className="mt-4 mb-4 align-items-center justify-content-between"> 
            <h5 style={{color: "maroon", width:300}}> 
                Reaction CGEM ID: {reaction?.id} 
            </h5>
            <div style={{width:450, display:'flex', justifyContent:'between'}} >
                <button 
                    className="btn btn-outline-primary mx-1" 
                    style={{width:200}} 
                    onClick={() => {
                        if (user) {
                            setShowEditModal(true)
                        } else {
                            setShowUnauthorizedModal(true)
                        }
                    }} >
                        Edit this reaction
                </button>
                <button 
                    className="btn btn-outline-danger mx-1" 
                    style={{width:200}} 
                    onClick={() => {
                        if (user) {
                            setShowDeleteModal(true)
                        } else {
                            setShowUnauthorizedModal(true)
                        }
                    }} >
                        Delete this reaction
                </button>
            </div>
        </Row>
        <EditModal 
            show={showEditModal} 
            onHide={() => setShowEditModal(false)}
            reactionId = {id} 
            authTokens = {authTokens}
            initialReactionData = {reaction} />
        <DeleteModal 
            show={showDeleteModal} 
            onHide={() => setShowDeleteModal(false)}
            reactionId = {id}
            authTokens = {authTokens} />
        <UnauthModal 
            show={showUnauthorizedModal} 
            onHide={() => setShowUnauthorizedModal(false)} />
        <Table responsive='sm' striped bordered>
            <thead>
                <tr>
                    <th>Monomer Name</th>
                    <th>SMILES</th>
                    <th>Leaving Group</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{reaction?.monomer?.monomer_name}</td>
                    <td>{reaction?.monomer?.monomer_smiles}</td>
                    <td>{reaction?.monomer?.monomer_LG}</td>
                </tr>
            </tbody>
        </Table>
        <br></br>
        <Row id="figRow" className="figureRow">
            <Card className = "reactionPageCard px-0" id = "rxnCard" style={{width: 400, height: '100%'}}>
                <Card.Header> <strong>Monomer Structure</strong></Card.Header>
                <Card.Body>
                    <MonomerDrawing smiles={reaction?.monomer?.monomer_smiles} width="350" height={height} />
                </Card.Body>
            </Card>
            <FlexOrSynthInfo synthetase={reaction?.synthetase} flexizyme={reaction?.flexizyme} readout={reaction?.rib_readout} />
            <Trna_info trna={reaction?.tRNA} />
        </Row>
        <br />
            <MicrohelixAssay reaction={reaction} />
        <br />
        <div>
            <RibosomeInfo reaction={reaction} />
        </div>
        <div>
            <References references={reaction?.references} />
        </div>
    </Container>
  );
   } else {
       return <div className = "mt-5 text-center"> 
            <strong> 
                {(status >= 404) ? "Wrong page! Nothing to see here..." :
                    "Waiting for reaction information to load..."}
            </strong> 
        </div>
   }
}

export default ReactionPage