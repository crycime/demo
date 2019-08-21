/**
 * Created with Cocos2d-x3.0 jsb.
 * User: lizizhen
 * Date: 2019/8/20
 * Time: 17:10
 *
 */

import nodemailer from 'nodemailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '../config/config.service';

@Injectable()
export default class MailerService {
    constructor(private readonly config: ConfigService) {}

    async sendEmail(option: { emailAddress: string; title: string; content: string }) {
        const transporter = nodemailer.createTransport(this.config.mailer);
        const mailOptions = {
            from: this.config.mailer.auth.user, //发件人地址
            to: option.emailAddress, //接收者列表
            subject: option.title, //主题行
            html: `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
  <title>Title</title>
</head>
<body>

<table
    width="600" style="margin-bottom: 10px;
    border-collapse: collapse;
    display: table;"
>
  <tbody>
  <tr class="firstRow">
    <th style="background-color: rgb(204, 204, 204);    border-top-width: 2px;">
      ${option.title}
    </th>
  </tr>
  <tr>
    <td valign="top" style="    border: 1px solid #DDD;">
      你好,<span class="Apple-converted-space">&nbsp;</span><br />
	  
	<br />驗證鏈接
      <hr />
       <h3><a href=${option.content}>${option.content}</a></h3>
    </td>
	
  </tr>
  </tbody>
</table>
<p>
  <br />
</p>

<script>

</script>
</body>
</html>
`
        };
        await transporter.sendMail(mailOptions);
        return 'Success';
    }
}
