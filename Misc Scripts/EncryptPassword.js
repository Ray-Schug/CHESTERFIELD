/*---- User intial parameters ----*/
var inputPassWord = 'password';

var result = aa.publicUser.encryptPassword(inputPassWord);

if (result.getSuccess()) {
	aa.debug("Encrypted password is", result.getOutput());
} else {
	aa.debug("Encryption failed", result.getErrorMessage());
}