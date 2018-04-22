import React, { Component, Fragment } from 'react'
import axios from 'axios'
import { API_ROOT } from '../../constants/api'

class File extends Component {
	constructor(props) {
		super(props)

		this.state = {
			error: null,
			file: null,
			isLoading: false,
		}
	}
	componentDidMount() {
		const { match: { params: { id } } } = this.props
		if (!id) {
			return this.setState({
				error: 'File is not found',
			})
		}

		axios
			.get(`${API_ROOT}/file/${id}`)
			.then(response => {
				this.setState({ file: response.data.result, isLoading: false })
			})
			.catch(error => {
				this.setState({
					error: error.error.message || 'An error has occured.',
					isLoading: false,
				})
			})
	}

	render() {
		const { file, error } = this.state
		if (error) {
			return <div>{error}</div>
		}

		return (
			<Fragment>
				{file ? (
					<div>
						<h2>{`File: ${file.public_id}`}</h2>
						<a href={file.url} download>
							Download file
						</a>
					</div>
				) : (
					<div>Loading</div>
				)}
			</Fragment>
		)
	}
}

export default File
