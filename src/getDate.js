



export function getDate(date)
{
	var currentDate = new Date();
	var postDate = new Date(date);
	//var timeDifference = currentDate.getTime()-postDate.getTime();
	var timeDifference = 0;

	if(currentDate.getFullYear() > postDate.getFullYear())
	{
		timeDifference = currentDate.getFullYear() - postDate.getFullYear()+ " years";
	}
	else if(currentDate.getMonth() > postDate.getMonth())
	{
		timeDifference = currentDate.getMonth() - postDate.getMonth()+ " months";
	}
	else if(currentDate.getDate() > postDate.getDate())
	{
		timeDifference = currentDate.getDate() - postDate.getDate()+ " days";
	}
	else if(currentDate.getHours() > postDate.getHours())
	{
		timeDifference = currentDate.getHours() - postDate.getHours()+ " hours";
	}
	else if(currentDate.getMinutes() > postDate.getMinutes())
	{
		timeDifference = currentDate.getMinutes() - postDate.getMinutes()+ " minutes";
	}
	else
	{
		timeDifference = currentDate.getSeconds() - postDate.getSeconds()+ " seconds";
	}
	return timeDifference;
}