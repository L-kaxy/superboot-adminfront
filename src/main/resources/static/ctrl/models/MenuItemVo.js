/**
 * Copyright (c) 2014 Wteamfly.  All rights reserved. 网飞公司 版权所有.
 * 请勿修改或删除版权声明及文件头部.
 */

/**
 * MenuitemVo实体.
 * 
 * @author 殷梓淞
 * @since v1.0.0
 */
if (typeof MenuItemVo == 'undefined') {
	function MenuItemVo() {
		this.menuitemid;
		this.menuid;
		this.menuitemname;
		this.menuitemicon;
		this.menuitemorder;
		this.menuitemurl;
		this.menuitemrouteurl;
		this.menuitemctrl;
		this.menuitemparentid;
		this.isshow;
		this.createtime;
		this.creatorid;
		this.editetime;
		this.editorid;
		this.isdelete;
		this.islockup;
		this.version;
	}
}
MenuItemVo.prototype.voToJson = function() {
	return JSON.stringify(this);
};
