import React from 'react'
import { Link } from 'react-router-dom'

const ReactionListItem = ({ reaction, verbose }) => {


  return (
    <tr className="text-center">
        <td> 
            <Link to={`/reaction/${reaction.id}`} className="Link" style={{textDecoration: 'none', color: 'maroon'}} target="_blank"> 
            {reaction.monomer} 
            </Link>
        </td>
        <td> {reaction.flexizyme} </td>
        <td> {reaction.synthetase} </td>
        <td> {reaction.n_term_percent || reaction.n_term_incorporation || 'not recorded'} </td>
        <td> {reaction.internal_percent || reaction.internal_incorporation || 'not recorded'} </td>
        <td> {(reaction.acylation_yield !== null) ? (reaction.acylation_yield) : ( (reaction.flexizyme != null) ? "not measured" : "" )} </td>
    </tr>
  );
}

export default ReactionListItem