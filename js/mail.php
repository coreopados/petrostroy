<?php

$mail_to = $_POST['send_to'];


if($name = trim(htmlspecialchars($_POST['name']))){
$message .= 
'От '.$name;}

if($tel = trim(htmlspecialchars($_POST['tel']))){
$message .=
'Телефон: '.$tel;}

if($email = trim(htmlspecialchars($_POST['email']))){
$message .=
'E-mail: ' .$email;}

if($adress = trim(htmlspecialchars($_POST['adress']))){
$message .=
'Adress: ' .$adress;}

if($object = trim(htmlspecialchars($_POST['object']))){
$message .=
'Object: ' .$object;}

if($time = trim(htmlspecialchars($_POST['time']))){
 $message .=
'Object: ' .$time;}    
    
if($form_id = trim(htmlspecialchars($_POST['form_id']))){
$message .=
'Форма: ' .$form_id;}

$message = wordwrap($message, 70, "\r\n");

if (mail($mail_to, 'Сообщение от Stroypetrobalt', $message)){
    echo json_encode('ok');
}else{
    echo json_encode('err');
}

?>