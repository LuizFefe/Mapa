<?php
//define as a variaveis usadas na conexão do banco
$servername = "192.168.173.178";
$username = "postgres";
$password = "ipufgeo1977";
$dbname = "IPUF";

$nome = $_POST["nome"];
$email = $_POST["email"];
$telefone = $_POST["telefone"];
$distrito = $_POST["distrito"];
$intencao = $_POST["intencao"];
$geometria = $_POST["geometria"];
$stmt->execute();



try {
//  estabelece a conexão com o banco usando PDO
    $conn = new PDO("pgsql:host=$servername;dbname=$dbname", $username, $password);

//  "seta" o tratamento de erros do PDO
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

//  prepara a string com o comando em SQL e os parametros bind que receberão os valores a serem inseridos no banco
    $stmt = $conn->prepare("INSERT INTO pracas_web.pracas_formulario (nome, email, telefone, distrito, intenção, poligono) 
VALUES (:nome, :email, :telefone, :distrito, :intenção, :poligono)");
    $stmt->bindParam(':nome', $nome);
    $stmt->bindParam(':email', $email);
    $stmt->bindParam(':telefone', $telefone);
    $stmt->bindParam(':distrito', $distrito);
    $stmt->bindParam(':intenção', $intencao);
    $stmt->bindParam(':poligono', $geometria);


//  passsando os valores inseridos através do formulario como váriaves
   
    
//  se a insersão no banco for bem sucessida essa mensagem aparecerá na tela    
    echo "New records created successfully";
}
//tratamento de erros 
catch(PDOException $e)
{   
//  se ocorrer algum erro, essa mensagem aparecerá na tela informando o erro.
    echo "Error: " . $e->getMessage();
}
$conn = null;
?>