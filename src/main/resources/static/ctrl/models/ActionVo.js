/**
 * Copyright (c) 2014 Wteamfly.  All rights reserved. 网飞公司 版权所有.
 * 请勿修改或删除版权声明及文件头部.
 */

/**
 * PermissionVo实体.
 * 
 * @author 殷梓淞
 * @since v1.0.0
 */
if (typeof ActionVo == 'undefined') {
	function ActionVo() {
		this.actionid;
		this.actionname;
		this.createtime;
		this.creatorid;
		this.editetime;
		this.editorid;
		this.isdelete;
		this.islockup;
		this.version;
	}
}
ActionVo.prototype.voToJson = function() {
	return JSON.stringify(this);
};
