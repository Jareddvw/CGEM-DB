import React from 'react'
import { useState, useEffect } from 'react'
import MonomerDrawing from '../components/MonomerDrawing'
import { Container, Row, Form, Col } from 'react-bootstrap'
import StructureList from '../components/list_components/StructureList'
import Flex_template from '../components/csv_components/Flex_template'

const StructureListPage = () => {

    let [reactions, setReactions] = useState([])
    const [SMILES, setSMILES] = useState('')
    const [status, setStatus] = useState(200)

    let queryString = ''

    useEffect(() => {
    }, [SMILES, status])

    let getReactions = async () => {
        if (SMILES.length > 0) {
            queryString = SMILES.toUpperCase()
            queryString = queryString.split('=').join('%3D')
            queryString = queryString.split('#').join('%23')
            queryString = queryString.split('(').join('%28')
            queryString = queryString.split(')').join('%29')
        }
        let response = await fetch(`/api/?monomer__monomer_smiles__substruct=${queryString}`)
        let data = await response.json()
        if (response.ok) {
            setReactions(data.results)
            setStatus(200)
        } else {
            setReactions([])
            try {
                setStatus(response.status)
            } catch {
                setStatus(500)
            }
        }
    }

    const handleEnterKeyPressed = (event) => {
        if (event.key === 'Enter') {
            getReactions()
        }
    }

    const returnStatement = () => {
        if (reactions === []) {
            return (<> Waiting for data to load... </>)
        } else if (status === 200) {
            return (<StructureList reactions={reactions} verbose={false} />)
        } else if (status === 406) {
            setReactions([])
            return <div className = "text-center mb-3"> Please enter a valid SMILES. </div>
        } else if (status === 500) {
            setReactions([])
            return <div className = "text-center mb-3">  An error occurred! Your SMILES may not be valid. </div>
        } else {
            return <div className = "text-center mb-3">  An error occurred! Your SMILES may not be valid. </div>
        }
    }

    return (
        <>
            <Container>
                <Row as="h4" className='mt-4 mb-3'>Substructure Search</Row>
                <Row className='mt-3'> Enter a valid SMILES string below. This will return all monomers which
                contain the given molecule as a substructure. </Row>
                <Row className='mt-3 mb-3' style={{display:'flex', alignItems:'center'}}> 
                    Substructure SMILES: 
                    <div style={{width:700}}>
                        <Form.Control
                            onChange={(e)=>setSMILES(e.target.value)} 
                            onSubmit={()=>getReactions()} 
                            onKeyPress={handleEnterKeyPressed}
                            type="text" placeholder="SMILES" >
                        </Form.Control>
                    </div>
                    <div className="btn btn-outline-primary mb-3 mt-3 w-25" 
                            onClick={getReactions} 
                            onSubmit={getReactions}> 
                        Search 
                    </div>
                </Row>
                {SMILES !== '' ? 
                    (<Row style={{display:'flex', justifyContent:'center'}}>
                        <MonomerDrawing smiles={SMILES} 
                                        width={Math.min(400 + SMILES.length * 20, 1200)} 
                                        height={300} />
                    </Row>) : 
                    <Row className='mb-3' ></Row>}
                {returnStatement()}
            </Container>
        </>
    )

}

export default StructureListPage