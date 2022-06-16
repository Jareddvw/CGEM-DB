import React from 'react'
import StructureListItem from './StructureListItem'
import { Container, Row, Col } from 'react-bootstrap'

const StructureList = ({ reactions, nolink, verbose }) => {

  // const width = 350
  // const height = 250


  const width = 267
  const height = 200
  const cardsPerRowLG = 4
  const cardsPerRowMD = 3
  const cardsPerRowSM = 2

  return (
    <>
        <>
            <Row className="g-0 structure-list" lg={cardsPerRowLG} md={cardsPerRowMD} sm={cardsPerRowSM}>
                {reactions.map((reaction, index) => 
                    <Col key={reaction.id || index}>

                      {(verbose === true) ? 
                          <StructureListItem id = {reaction?.id} 
                          name = {reaction.monomer.monomer_name || reaction.monomer.monomer_smiles} 
                          flexizyme = {reaction.flexizyme?.flex_name} 
                          synthetase = {reaction.synthetase?.synth_common_name} 
                          acylation_yield={reaction.assay?.acylation_yield} 
                          smiles={reaction.monomer?.monomer_smiles} 
                          width={width} height={height} nolink={nolink} /> 
                          : 
                          <StructureListItem id = {reaction?.id} 
                          name = {reaction.monomer} 
                          flexizyme = {reaction.flexizyme} 
                          synthetase = {reaction.synthetase} 
                          acylation_yield={reaction.acylation_yield} 
                          smiles={reaction.monomer_smiles} 
                          width={width} height={height} nolink={nolink} /> 
                        }
                        
                    </Col>
                )}
            </Row>
        </>
    </>
  )
}

export default StructureList