var grid = angular.module("gridModule",["kendo.directives"]);
angular.module("AngularModule",["gridModule"]);
grid.controller("UserController" , function($scope){
	$scope.showGrid = $scope.showAddUser= $scope.showGroups = $scope.activeUser = $scope.activeGroup = $scope.groupDropdownBox = false;
	$scope.roleArr = ["Role1", "Role2", "Role3", "Role4","Role5", "Role6","Role7","Role8","Role9","Role10"];
	$scope.roleSelectedArr = [];
	$scope.blueLayer = $scope.showD3 = $scope.itemSelected = $scope.itemPosition = $scope.itemIndex  = $scope.activeBtnLeft = $scope.activeBtnRight=""
	$scope.showUserBlock = function(){
		$scope.showGrid = !$scope.showGrid; 
	}
	$scope.showD3ActiveLayer = function(obj){
		/*var elem = $(obj.target);
		if(elem.hasClass("expand-user")){
			elem.find(".fa-chevron-right").removeClass("fa-chevron-right").addClass("fa-chevron-down");
		} else if(elem.hasClass("fa-chevron-right")) {
			elem.removeClass("fa-chevron-right").addClass("fa-chevron-down");
		}
		console.log(elem); */
		$scope.showD3 = !$scope.showD3;
		if($scope.showAddUser){
			$scope.blueLayer = true;
		}else{
			$scope.blueLayer = false;
		}
	}
	$scope.showAddUserBlock = function(){
		$scope.showAddUser = !$scope.showAddUser;
		if($scope.showAddUser){
			$scope.activeUser = true;
		}else{
			$scope.activeUser = false;
		}
	}
	$scope.moveItem = function(type){
		if($scope.itemPosition === type) {
			if(type==="left"){
				$scope.roleArr.splice($scope.index,1);
				$scope.roleSelectedArr.push($scope.itemSelected);
				console.log($scope.roleArr);
				console.log($scope.roleSelectedArr);
			}else if(type==="right"){
				$scope.roleSelectedArr.splice($scope.index,1);
				$scope.roleArr.push($scope.itemSelected);
			}
			$scope.itemSelected = $scope.itemPosition = $scope.itemIndex  = $scope.activeBtnLeft = $scope.activeBtnRight="";

		}
	}
	$scope.movableItem = function(obj){
		//var elem = $event.currentTarget || $event.srcElement || $event.target;
		//var elem = obj.target.attributes.class = "helo";
		var elem = $(obj.target);
		var elemParent= $(".groups-box");
		var otherElem = elemParent.find(".active");

		if(otherElem.length <= 1){
			otherElem.removeClass("active");
			$scope.index = obj.target.attributes.index.value;
			$scope.itemSelected = obj.target.attributes.name.value;
			$scope.itemPosition = obj.target.attributes.location.value;
			if($scope.itemPosition==='left') $scope.activeBtnLeft=true;
			else if($scope.itemPosition==='right') $scope.activeBtnRight = true;
			if(elem.hasClass('active')){
				elem.removeClass('active');
			}else {
				elem.addClass('active');
			}
		}
	}
	$scope.showUserGroupsBlock = function(){
		if($scope.showAddUser) {
			$scope.showGroups = !$scope.showGroups;
		}
		$scope.activeUser = false;
		if($scope.showGroups) {
			$scope.activeGroup = true;
		}else{
			$scope.activeGroup = false;
		}
	}
	$scope.showGroupDropdownBlock = function(){
		//alert("hi");
		$scope.groupDropdownBox = !$scope.groupDropdownBox;
	}
});

grid.controller("GridCtrl", function($scope){
	$scope.checkboxCode = "<input type='checkbox' class='chk-box' disabled checked>";
	$scope.mainGridOptions = {
		dataSource: [ { users: "User 1",
					 roles: "Role1 , Role 2, Role 3, Role 4"
					},
					{ users: "",
					 roles: "Role1 ",
					 view: "" ,
					 edit :"",
					 create :"",
					 reject :"",
					 approve :""
					},
					{ users: "",
					 roles: "Role2 ",
					 view: "" ,
					 edit :"",
					 create :"",
					 reject :"",
					 approve :""
					},
					{ users: "",
					 roles: "Role3 ",
					 view: "" ,
					 edit :"",
					 create :"",
					 reject :"",
					 approve :""
					}
				   ],

		height: 180,
		sortable: true,
		selectable: "row",
		scrollable: false,
		pageable: {
			refresh: true,
			pageSizes: true,
			buttonCount: 2,
			pageSize: 2,
			info: true,
			messages: {
			  display: " {2}"
			}
		},
		/*pageable: {
            refresh: true,
            pageSizes: true,
            buttonCount: 5
        },*/
		dataBound: function() {
			this.expandRow(this.tbody.find("tr.k-master-row").first());
		},
		columns: [{
			field: "users",
			title: "Users",
			width: 200
		}, {
			field: "roles",
			title: "Roles"
		}, {
			field: "view",
			title: "Views",
			template:kendo.template($scope.checkboxCode)
		},
		{
			field: "edit",
			title: "Edit",
			template:kendo.template($scope.checkboxCode)
		},
		{
			field: "create",
			title: "Create",
			template:kendo.template($scope.checkboxCode)
		},
		{
			field: "reject",
			title: "Reject",
			template:kendo.template($scope.checkboxCode)
		},
		{
			field: "approve",
			title: "Approve",
			template:kendo.template($scope.checkboxCode)
		}],
		dataBinding: function(e) {
				var $pagerRefresh = $('.k-pager-refresh').clone();
				$('#details-grid .k-pager-refresh').remove();
				$('#details-grid .k-grid-header tr th:first-child').prepend($pagerRefresh);

				$('.k-pager-wrap').wrapInner('<div class="k-pager-innerwrap"></div>');
		}
	};
});
