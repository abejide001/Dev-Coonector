import React, { Component } from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { deleteEducation } from '../../actions/profileActions'
class Education extends Component {
    handleDelete = id => {
       this.props.deleteEducation(id, this.props.history)
    }
	render() {
		const education = this.props.education.map((exp) => (
			<tr key={exp._id}>
				<td>{exp.school}</td>
				<td>{exp.degree}</td>
				<td>
					<Moment format="YYYY-MM-DD">{exp.from}</Moment>/
                    {exp.to === null ? ('Now') : (<Moment format="YYYY-MM-DD">{exp.to}</Moment>)}
				</td>
				<td>
					<button className="btn btn-danger" onClick={() => this.handleDelete(exp._id)}>Delete</button>
				</td>
			</tr>
		));
		return (
			<div>
				<h4 className="mb-4">Education Credentials</h4>
				<table className="table">
					<thead>
						<tr>
							<th>School</th>
							<th>Degree</th>
							<th>Years</th>
							<th />
						</tr>
					</thead>
					<tbody>{education}</tbody>
				</table>
			</div>
		);
	}
}
export default connect(null, { deleteEducation })(Education);
