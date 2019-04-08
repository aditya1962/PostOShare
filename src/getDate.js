



export function getDate(date)
{
	var currentDate = new Date();
	var postDate = new Date(date);
	//var timeDifference = currentDate.getTime()-postDate.getTime();
	var timeDifference = 0;

	if(currentDate.getFullYear() > postDate.getFullYear())
	{
		timeDifference = currentDate.getFullYear() - postDate.getFullYear()+ " year(s)";
	}
	else if(currentDate.getMonth() > postDate.getMonth())
	{
		timeDifference = currentDate.getMonth() - postDate.getMonth()+ " month(s)";
	}
	else if(currentDate.getDate() > postDate.getDate())
	{
		timeDifference = currentDate.getDate() - postDate.getDate()+ " day(s)";
	}
	else if(currentDate.getHours() > postDate.getHours())
	{
		timeDifference = currentDate.getHours() - postDate.getHours()+ " hour(s)";
	}
	else if(currentDate.getMinutes() > postDate.getMinutes())
	{
		timeDifference = currentDate.getMinutes() - postDate.getMinutes()+ " minute(s)";
	}
	else
	{
		timeDifference = currentDate.getSeconds() - postDate.getSeconds()+ " second(s)";
	}
	return timeDifference;
}