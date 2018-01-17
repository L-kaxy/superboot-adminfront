/**
 * Copyright (c) 2014 Wteamfly.  All rights reserved. 网飞公司 版权所有.
 * 请勿修改或删除版权声明及文件头部.
 */

/**
 * UserkeyVo实体.
 * 
 * @author 殷梓淞
 * @since v1.0.0
 */
if (typeof UserkeyVo == 'undefined') {
	function UserkeyVo() {
		this.userkeyid;
		this.userid;
		this.logintype;
		this.loginmsg;
		this.credential;
		this.createtime;
		this.creatorid;
		this.editetime;
		this.editorid;
		this.isdelete;
		this.islockup;
		this.version;
	}
}
UserkeyVo.prototype.voToJson = function() {
	return JSON.stringify(this);
};
