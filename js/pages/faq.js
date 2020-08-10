function searchKeyword()
	{
	 
		var input,filter, vQestionset, vCounter, vQuestions, vAnswers, strQ, strA,vTopic, vSearch;
    vSearch = false;
    var vSrchResult = document.getElementsByClassName("searchresult");
    vSrchResult[0].classList.add("SearchData");

    input  = document.getElementById("searchKey");
		filter = input.value.toLowerCase();
 
    vquestionsgroup = document.getElementsByClassName("questions-group");
		for( vCounter = 0;  vCounter < vquestionsgroup.length; vCounter++)
		{
      vTopic = vquestionsgroup[vCounter].getElementsByClassName("topic");
      vTopic[0].classList.add("hideTopic");
      vTopic[0].classList.remove("showTopic");
      vQestionset = vquestionsgroup[vCounter].getElementsByClassName("question-set")
        for(var i =0; i<vQestionset.length; i++)
        {
          vQuestions = vQestionset[i].getElementsByClassName("question");
          vAnswers   = vQestionset[i].getElementsByClassName("answer");
          strQ = vQuestions[0].innerText.toLowerCase();
          strA = vAnswers[0].innerText.toLowerCase();       
          
          if ((strQ.indexOf(filter) > -1) || (strA.indexOf(filter) > -1)) 
          {
                  vQestionset[i].style.display = "block";
                  vTopic[0].classList.remove("hideTopic");
                  vTopic[0].classList.add("showTopic");
                  vSearch = true;
          }
          else
          {
            vQestionset[i].style.display = "none";
          }
		    } 
    }
    if (vSearch == false)
    {
       
          vSrchResult[0].classList.add("showTopic");
          vSrchResult[0].classList.remove("SearchData");
    }
  }