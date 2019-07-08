/* eslint-disable */
import React from 'react';
import '../index.css';
import * as GetDate from '../Data/getDate.js';

class DateComment extends React.Component
{
	render()
	{
		return(
			<p className="datetime"> {GetDate.getDate(this.props.date)} ago </p>
			);
	}
}

export default DateComment;