app.controller('indexController', ['$scope','indexFactory',($scope,indexFactory ) =>{
    $scope.messages = [ ];
    $scope.players = { };
    $scope.init = () =>
    {
        let username = prompt("Enter a username");
        if(username)
        {
            initSocket(username)
        }else
        return false
    }
    function initSocket(username)
    {

        indexFactory.connectSocket('http://localhost:3000',{
            reconnectionAttemts:3,
            reconnectionDelay:600
        }).then((socket)=>
        { 
            console.log('burada');
            socket.emit('newUser', { username });

            socket.on('initPlayer',(players)=>
            {
                console.log(players);
                $scope.players = players;
                $scope.$apply();
            })
            socket.on('newUser',(data)=>
            {
                $scope.messages.push({
                    type:{
                        code:0,
                        message:'katildi'
                    },
                    username:data.username
                });
                $scope.$apply();
            })
            socket.on('disUser',(data)=>
            {
                $scope.messages.push({
                    type:{
                        code:0,
                        message:'cikis yapti'
                    },//logout
                    username:data.username
                });
                $scope.$apply();
                console.log(data);
            })
            let animate = false;
            $scope.onClickPlayer =  ($event) =>
            {
                if(!animate)
                {
                    animate=true;
                    $('#'+socket.id).animate({ 'left':$event.offsetX, 'top':$event.offsetY }, () =>
                    {
                        animate=false;
                    })
                 }
                console.log($event.offsetX, $event.offsetY)
            };
        }).catch((error) =>
        {
            throw error;
        })
    }
    
}])