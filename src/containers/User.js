import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import User from '../components/User'

import * as MainActions from '../actions/main'

function mapStateToProps(state) {
	return {
		db: state.db,
		local: state.local,
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(Object.assign({}, MainActions), dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(User)
