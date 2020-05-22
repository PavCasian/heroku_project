"use strict";
var myPage = document.getElementById( "myPage" ),
	footer = document.getElementById( "footer" ); 
var dateTime = Date().substring(4, 24);
var startTime = Date.now();
var imgF = ['L_N','L_C','L_I','R_N','R_C','R_I','fix','tooSlow'],
    fixF = imgF[6],
	slowF = imgF[7];
var condInOneBlock = [0,1,2,3,4,5,0,1,2,3,4,5],
    answerForCond = 'ZZZMMM';
var fixTimeOption = [500,600,700,800,900,1000,1100,1200],
    maxTgTime = 1500,
	fbkTime = 800;
var totBlock = 12, //in the final version use 12
    block_cnt = -1,
	rec = [],
	recIdx = -1,
	nTrial = condInOneBlock.length; //final version: condInOneBlock.length;
var trial_cnt, cond, ans;
function shuffle(array) {
    var i = 0, j = 0, temp = null;
	for (i = array.length - 1; i > 0; i -= 1) {
	   j = Math.floor(Math.random() * (i + 1)); //The Math.floor() function returns the largest integer less than or equal to a given number
	   temp = array[i];                         //Math.random() generates a random number from the library; then math.floor() will round it the floor of the whole number: 10.7 to 10; 10.3 to 10;
	   array[i] = array[j];
	   array[j] = temp;
	}
	return array;
} //end of shuffle
function showImg( f ) {
         myPage.innerHTML = '<img src="./image/' + f + '.jpg" alt="">';
}
function reqKeysToFunc( keySet, myFunc ){
	document.onkeydown = function(event) {  //this is an event listener. when an onkeydown happens do this
		var myKey = event.key.toUpperCase();
		
		if( keySet.search(myKey) > -1){
			keySet = keySet.replace(myKey, '');
			if( keySet === '') {
				document.onkeydown = null;
				myFunc();
            }
	    }
    };
}
function instruction(){
	footer.innerHTML = 
	   'This task is included in a research project that has been approved'+
	   ' by the Ethics Committee and Research Governance Office of the University'+
	   ' of Southampton, United Kingdom (Ethics ID:XXXX). You can withdraw at any time.';
	myPage.innerHTML = 
	    '<h2 class = "center">Flank Task</h2>'+
        '<p>'+
		'Greatings, <br> Thank you for showing '+ 
	    'interest in our Flank task. '+  
		'In the present task you will be presented with images of green cartoon faces. '+
	    'Each image contains five faces, the one that is horizontally and vertically centred is the target face. '+
		'The flanked faces at the four corners are distractors(see the image below). Your task is to indicate '+
		'<b>as quickly and accurately as possible the gaze direction</b> of the target face. '+
		'Press "Z" on your keyboard if target gaze direction is to the left, and '+
		'press "M" on your keyboard if target gaze direction is to the right. '+
		'The full procedure of the task is outlined below: '+
		'</p>'+
		'<ol>'+
		'<li>Press both "Z" and "M" to initiate the task.</li> '+
		'<li>Again press both "Z" and "M" to start a new block of 12 trials.</li> '+
		'<li>Fixate the "@" symbol.</li> '+
		'<li>Make the key response ("Z" or "M") within 1500 ms of the target display onset.</li> '+
		'<li>Attend to the issued feedback:</li> '+
		'<ul>'+
		'<li><b>Reaction time(RT)</b> if correct key was pressed</li> '+
		'<li><b>Invalid</b> if an invalid key was pressed</li>'+
		'<li><b>Incorrect</b> if an incorrect key was pressed</li>'+
		'<li><b style="color:red;">Too slow!</b> if key not pressed within 1500ms of the target display onset</li>'+
		'</ul>'+
		'</ol>'+
		'<p>'+
		'Please note that step 1 applies only once; step 2 for each new block of trials; steps 3-5 for each trial. '+
        'You will have the chance to take a break between the blocks. When you are ready please follow step 1.'+	
        '</p>'+		
        '<br>'+
		'<div class = "center" height = "100">'+
	    '<img src="./image/L_N.jpg" alt=""><br><br>'+
		'</div>';
	reqKeysToFunc( 'ZM', flank );
}
function flank(){
	block_cnt++;
	if(block_cnt < totBlock){
		    footer.innerHTML = '';
		    myPage.innerHTML = 
			        '<h3 class = "center">Block ' + (block_cnt + 1) + ' of 12</h3>'+
			        '<p>When you are '+
					'ready press both "Z" and "M" (in any order) '+
					'to continue</p>';      
			reqKeysToFunc( 'ZM',aBlock);
	} else { 
	submitData();
	}
}
function aBlock(){	
	 shuffle(condInOneBlock); 
	 trial_cnt = -1;
	 beginTrial();
}

function beginTrial(){
    trial_cnt++;
	if( trial_cnt < nTrial ) {
		cond = condInOneBlock[ trial_cnt ]; //trial_cnt to be used as the index to retrieve the desired value
	    ans = answerForCond[ cond ];//cond is the index to retrieve the desired value
		recIdx++;
		rec[ recIdx ] = [block_cnt, cond, ans, '-', 0, 9999]; //posit 3 for the key pressed; posit 4 for accuracy; posit 5 for RT;
	    showFix();
	} else {
		flank(); //start a new block
	}
}
function showFix(){
	showImg(fixF);
	shuffle(fixTimeOption);
	setTimeout( showTg, fixTimeOption[0] ); 
}
function showTg(){
	showImg(imgF[cond]);
	respRec();
}
function respRec(){
	var tooSlow = setTimeout( showSlow, maxTgTime ); 
	var startRT = Date.now();
	document.onkeydown = function(event) {
	       document.onkeydown = null;
	       clearTimeout(tooSlow);
	       myPage.innerHTML = '';
	       var endRT = Date.now();
		   var RT = endRT - startRT;
		   rec[ recIdx ][ 5 ] = RT;
		   var kp = event.key.toUpperCase();
		   rec[ recIdx ][ 3 ] = kp;
		   if ( RT < maxTgTime) {
			   if( kp == ans ) {
				   myPage.innerHTML = '<b>RT = ' + RT + ' ms</b>';
				   rec[ recIdx ][ 4 ] = 1;
				   setTimeout( beginTrial, fbkTime );
			   }
			   if( kp != ans ) {
				   if( kp == 'Z' || kp == 'M'){
					   myPage.innerHTML = '<b>Incorrect</b>';
					   setTimeout( beginTrial, fbkTime );
				   } else {
					   myPage.innerHTML = '<b>Invalid</b>';
					   setTimeout( beginTrial, fbkTime );
				   }
			   }
		   }
	};
	
}
function showSlow(){
	showImg(slowF);
	setTimeout( beginTrial, fbkTime );
		}	
function submitData() {
	var endTime = Date.now();
	var tempTime = (endTime-startTime)/60000;
	var taskTime = tempTime.toFixed(2); // doubles (aka floating point number (aka decimals))
	var i, record = [], recordTemp = [];
	for(i=0; i < rec.length; i++){
	    recordTemp.push( rec[i].join(',') );
	}
	record = recordTemp.join(';');
	myPage.innerHTML = 
	           '<form action="flank.php" method="post" id="flankForm">'+
			   '<input type="hidden" name="dateTime" value="' + dateTime + '">'+   //the value in the name attribute will be used as an identifier in $_POST
			   '<input type="hidden" name="taskTime" value="' + taskTime + '">'+
			   '<input type="hidden" name="rec" value="' + record + '">'+
			   '</form>';
 document.getElementById("flankForm").submit();
}
var debrief = '<h2>Many thanks for your contributions.</h2>'+
              '<p>'+
			    'The Eriksen flanker task is a set of response '+ // from https://en.wikipedia.org/wiki/Eriksen_flanker_task
				'inhibition tests used to assess the ability to suppress responses that '+
				"are inappropriate in a particular context. Research shows that participant's performance "+
				'is negatively affected in trials where distractors '+
				'provide contradictory information to the target '+
				'compared to trials where distractors convey the same or neutral information '+
				'relative to the target. '+
				'In the present study, we are testing a new version of the flank task which uses animated green faces as '+
                'stimuli. For more information, please check the link below: '+
              '<p>'+
              '<ul>'+
              '<li><a href="https://link.springer.com/article/10.3758/BF03203267" target="_blank">Eriksen, B. A. &amp; Eriksen, C. W. (1974). '+
                   'Effects of Noise Letters Upon the Identification of a Target Letter in a Nonsearch Task. '+
				   '<i>Perception and Psychophysics, 16,</i> 143. doi.org/10.3758/BF03203267 </a></li>'+
              '</ul>'+
              '<p>'+
              'This task is included in a research project that has been approved by the Ethics '+
              'Committee and Research Governance Office of the University of Southampton, United '+
	          'Kingdom (Ethics ID: XXXX). If you have questions about your rights as a participant '+
	          'in this research, or if you feel that you have been placed at risk, you can contact '+ 
	          'the Chair of the Ethics Committee, Psychology of the University of Southampton. UK. '+
	          'Phone : (+44)(0)23 8059 2587. '+
              '</p>';			  