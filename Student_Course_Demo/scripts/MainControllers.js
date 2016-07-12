app.controller('MainController', ['$scope', function($scope) {
    $scope.title = 'Top Sellers in Books';
    $scope.promo = 'best books you will find';
    $scope.products = [{
        name: 'The Book of Trees',
        price: 19,
        pubdate: new Date('2014', '03', '08'),
        cover: './img/the-book-of-trees.jpg',
        likes: 0,
        dislikes: 0
    }, {
        name: 'Program or be Programmed',
        price: 8,
        pubdate: new Date('2013', '08', '01'),
        cover: './img/program-or-be-programmed.jpg',
        likes: 0,
        dislikes: 0
    }, {
        name: 'Harry Potter & The Prisoner of Azkaban',
        price: 11.99,
        pubdate: new Date('1999', '07', '08'),
        cover: './img/Harry_Potter_and_the_Prisoner_of_Azkaban_(US_cover).jpg',
        likes: 0,
        dislikes: 0
    }, {
        name: 'Ready Player One',
        price: 7.99,
        pubdate: new Date('2011', '08', '16'),
        cover: './img/Ready_Player_One_cover.jpg',
        likes: 0,
        dislikes: 0
    }];
    $scope.plusOne = function(index) {
        $scope.products[index].likes += 1;
    };
    $scope.minusOne = function(index) {
        $scope.products[index].dislikes += 1;
    };

}]);