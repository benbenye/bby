$(function($) {
	// 游戏所需数据
	var movieSur = {
		goldMoney       : 900,         //总的金币数
		isShared        : false,       //是否分享 对于这个游戏逻辑 暂时不需要
		curentIndex     : 0,           //当前答题位置
		seedMovies      : 0,           //已看过的影片数（不含跳过影片）
		skipMoney       : 100,         //跳过所需金币
		promptMoney     : 50,          //提示所需金币
		rewardMoney     : 20,          //答对所获金币
		promptRandomArr : [],          //提示存放随机位置的数组
		movieArr        : [            //电影数据
			{
				altAnswer      : '为本页您提供引搜擎索集合界全世谷歌烦为本页为本页',//备选答案
				imgSrc         : '',//剧照链接
				rightAnswer    : '全世界'//正确答案
			},
			{
				altAnswer      : '您引搜擎索集合供最有名各界全世谷歌烦为本页为本页',//备选答案
				imgSrc         : '',//剧照链接
				rightAnswer    : '谷歌搜索'//正确答案
			}
		]
	};
	if (localStorage.visited){
		// localStorage.clear();
		console.log('hello '+ localStorage.username);
	}else{
		localStorage.username = 'dd';
		localStorage.visited = 1;
	}

	$('#start').click(function(){
		start();
	})
	// 开始游戏
	function start(){
		$('#sec1,#sec3').hide();
		//初始化游戏页面
		init();
		$('#sec2').show();
	}
	// init()
	function init(){
		console.log(movieSur);
		$('.answer-the-region ul li').remove();
		$('.answer-choices ul li').remove();
		var altAnswerLen = movieSur.movieArr[0].altAnswer.length,
			rightAnswerLen = movieSur.movieArr[0].rightAnswer.length;

		for(var i = 0; i < rightAnswerLen; ++i){
			$('.answer-the-region ul').append('<li></li>');
		}
		for(var j = 0; j < altAnswerLen; ++j){
			$('.answer-choices ul').append('<li>'+movieSur.movieArr[0].altAnswer[j]+'</li>');
		}
		movieSur.curentIndex = 0;
		movieSur.seedMovies = 0;
		$('#game-ing .menu .money').text(movieSur.goldMoney);
	}
	//main 游戏主逻辑
	$('#sec2').on('click','.answer-choices li', function(){
		var _thisLi = $(this),
			_thisLiIndex = _thisLi.index(),
			_liText = _thisLi.text(),
			_answerRegionLen = $('.answer-the-region li').length;


		$('.answer-the-region').removeClass('wrong-tip');

		$('.answer-the-region li').each(function(i){
			if($(this).text() === ''){

				$(this).text(_liText).data('index',_thisLiIndex);
				_thisLi.addClass('al-add');
				console.log(i + _answerRegionLen);
				// 判断答案正确与否
				var ansStr = '';
				$('.answer-the-region li').each(function(){
					ansStr += $(this).text();
				});
				if(ansStr.length == _answerRegionLen){
					
					if(ansStr == movieSur.movieArr[movieSur.curentIndex].rightAnswer){
						passHandle();
					}else{
						// 答案错误
						// wrongAnimate();
						$('.answer-the-region').addClass('wrong-tip');
					}
				}
				return false;
			}else{
				// 已经满了
				if(i == _answerRegionLen - 1){
					$('.answer-the-region').addClass('wrong-tip');
				}
			}
		});
	});

	// 撤销答案
	$('#sec2').on('click','.answer-the-region li',function(){
		if($(this).hasClass('no-click')){
			return false;
		}
		var _thisLi = $(this),
			_liIndex = _thisLi.data('index'),
			_thisLiText = _thisLi.text();

		_thisLi.text('');
		$('.answer-choices li:eq('+_liIndex+')').removeClass('al-add');
		$('.answer-the-region').removeClass('wrong-tip');
	});



	// 跳过一题
	$('#sec2 .skip').click(function(){
		var isSkip = confirm('确定跳过？');
		if(isSkip){
			var isPass = calculateGoldMoney(-2);
			if(isPass){
				passHandle();
			}else{
				alert('糟糕，金币不够用了！试着分享给朋友帮你回答？');
			}
		}
	});

	// 求助

	// 提示
	$('#sec2 .prompt').click(function(){
		var isPrompt = confirm('确定提示？');
		if(isPrompt){
			var isPass =  calculateGoldMoney(-1);
			if(isPass){
				console.log(movieSur.promptRandomArr.length);
				if(movieSur.promptRandomArr.length + 1 == $('#sec2 .answer-the-region ul li').length){
					
					$('#sec2 .answer-the-region ul li').each(function(i){
						$(this).text(movieSur.movieArr[movieSur.curentIndex].rightAnswer[i]).addClass('no-click');
					});
				}else{
					// 获得正确答案的随机位置
					var proRightAnswerLen = $('#sec2 .answer-the-region ul li').length,
						ranIndex = Math.floor(Math.random() * proRightAnswerLen);
					// 检测重复
					while(movieSur.promptRandomArr[ranIndex]){
						ranIndex = (ranIndex + 1) % proRightAnswerLen;
					}

					var ranText = movieSur.movieArr[movieSur.curentIndex].rightAnswer[ranIndex];
					$('#sec2 .answer-choices ul li').each(function(){
						if($(this).text() == ranText){
							$(this).addClass('al-add');
						}
					})
					$('#sec2 .answer-the-region ul li:eq('+ranIndex+')').text(ranText).addClass('no-click');
					movieSur.promptRandomArr[ranIndex] = ranText;
				}
				// 判断答案正确与否
				var ansStr = '';
				$('.answer-the-region li').each(function(){
					ansStr += $(this).text();
				});
				if(ansStr.length == $('#sec2 .answer-the-region ul li').length){
					if(ansStr == movieSur.movieArr[movieSur.curentIndex].rightAnswer){
						$('.answer-the-region').removeClass('wrong-tip');
						passHandle();
					}else{
						// 答案错误
						// wrongAnimate();
						$('.answer-the-region').addClass('wrong-tip');
					}
				}
			}else{
				alert('糟糕，金币不够用了！试着分享给朋友帮你回答？');
			}
		}

	});

	// 点击下一个
	$('#sec4 #show-movie .nextQuestion').click(function(){
		nextQuestion();
	});

	// 题目通过的处理 包括 答对 跳过 提示
	function passHandle(){
		calculateGoldMoney(1);
		showMovie();
	}
	function showMovie(){
		$('#sec4 .t2').text(movieSur.movieArr[movieSur.curentIndex].rightAnswer);
		$('#sec4 .t1 span').text(movieSur.curentIndex + 1);
		if(movieSur.curentIndex == movieSur.movieArr.length - 1){
			$('#sec4 .nextQuestion').text('点击通关');
		}else{
			$('#sec4 .nextQuestion').text('下一部');
		}
		$('#sec4').show();
	}

	// 从新开始
	$('#sec3 .restart').click(function(){
		restart();
	});

	// 金币增减
	function calculateGoldMoney(n){
		if(n == 1){
			// 答对加金币
			movieSur.goldMoney += movieSur.rewardMoney;
			$('#game-ing .menu .money').text(movieSur.goldMoney);
			++movieSur.seedMovies;
			return true;
		}else if(n == -2){
			// 跳过减金币
			if(movieSur.goldMoney - movieSur.skipMoney < 0){
				return false;
			}else{
				movieSur.goldMoney -= movieSur.skipMoney;
				$('#game-ing .menu .money').text(movieSur.goldMoney);
				return true;
			}
		}else if(n == -1){
			// 提示减金币
			if(movieSur.goldMoney - movieSur.promptMoney < 0){
				return false;
			}else{
				movieSur.goldMoney -= movieSur.promptMoney;
				$('#game-ing .menu .money').text(movieSur.goldMoney);
				return true;
			}
		}
	}
	// 下一题
	function nextQuestion(){
		++movieSur.curentIndex;
		$('#sec2 .menu .menu-title span').text(movieSur.seedMovies);
		$('#sec4').hide();
		movieSur.promptRandomArr = [];
		if(movieSur.curentIndex > movieSur.movieArr.length - 1){
			end('题库答完');
			return false;
		}
		$('.answer-the-region ul li').remove();
		$('.answer-choices ul li').remove();
		var altAnswerLen = movieSur.movieArr[movieSur.curentIndex].altAnswer.length,
			rightAnswerLen = movieSur.movieArr[movieSur.curentIndex].rightAnswer.length;

		for(var i = 0; i < rightAnswerLen; ++i){
			$('.answer-the-region ul').append('<li></li>');
		}
		for(var j = 0; j < altAnswerLen; ++j){
			$('.answer-choices ul').append('<li>'+movieSur.movieArr[movieSur.curentIndex].altAnswer[j]+'</li>');
		}
	}

	// check 答案
	function isRightAnswer(){
		$('.answer-the-region ul li').each(function(){
			var ansStr = '';
			$('.answer-the-region li').each(function(){
				ansStr += $(this).text();
			});
			if(ansStr == movieSur.movieArr[movieSur.curentIndex].rightAnswer){
				passHandle();
			}else{
				// 答案错误
				// wrongAnimate();
				$('.answer-the-region').addClass('wrong-tip');
			}
		})
	}

	// 重新开始游戏
	function restart(){
		start();
	}
	// 游戏结束
	function end(str){
		switch(str){
			case '题库答完' : 
				$('#sec1,#sec2').hide();
				$('#sec3').show();
				break;
			default : console.log('err');
				break;
		}
	}

	// 返回启动屏
	$('#go-back').click(function(){
		$('#sec2,#sec3,#sec4').hide();
		$('#sec1').show();
	});
	// 页面卸载之前记录用户数据
	$(window).unload(function(){
		
	});
});