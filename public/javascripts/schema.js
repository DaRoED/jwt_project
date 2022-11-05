// import
import mongoose from 'mongoose';
import { hashSync, compareSync } from 'bcrypt';
import jwt from 'jsonwebtoken';
// dotenv 불러오기(?)
require('dotenv').config();
// Schema 정의
const UserSchema = new mongoose.Schema({
    id: String,
    HSpw: String,
});
// 메서드 정의 및 추가

/**
 * password set
 * @param {string} password 
 */
UserSchema.methods.setPassword = async function (password) {
    const hash = hashSync(password, 10); // 인자로 받은 password를 해시로 변환
    this.HSpw = hash; // this의 Hspw에 password의 해시값 저장
}
/**
 * password와 this.HSpw가 같은지를 boolean으로 반환
 * @param {string} password 
 * @returns {boolean}
 */
UserSchema.methods.checkPassword = async function (password) {
    const result = compareSync(password, this.HSpw); // 인자로 받은 password와 this의 HSpw가 같은지 판별
    return result; // 아마 result는 true or false 일 것이며 result의 값을 반환
}

UserSchema.methods.generateToken = function () {
    const token = jwt.sign(
        {
            id: this.id
        },
        process.env.JWT_secret,
        {
            expiresIn: '30m',
        }
    );
    return token;
}
// Model 정의
const UserModel = mongoose.model('sign-feature-test', UserSchema);
// export
export default UserModel