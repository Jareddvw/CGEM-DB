import React from 'react'

import ReactionListItem from './ReactionListItem'
import Table from 'react-bootstrap/Table'
import { Container } from 'react-bootstrap'
import ReactionLI2 from './ReactionLI2'


const ReactionList = ({ reactions, verbose }) => {
    
  return (
    <>
        <div className="text-center">
            <div className = 'reaction-list'>
                <Table striped bordered hover size="lg" responsive="md">
                    <thead>
                        <tr>
                            <th>Name or SMILES</th>
                            <th>Flexizyme</th>
                            <th>Synthetase</th>
                            <th>N-terminal incorporation</th>
                            <th>Internal incorporation</th>
                            <th>Acylation yield (flexizymes)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(reactions) ? 
                            ((verbose === true) ?
                                (reactions.map((reaction) => (
                                    <ReactionLI2 key = {reaction.id} reaction = {reaction}/>))) :
                                (reactions.map((reaction) => (
                                    <ReactionListItem key = {reaction.id} reaction = {reaction}/>)))) : 
                            <></>}
                    </tbody>
                </Table>
            </div>
        </div>
    </>
  )
}

export default ReactionList