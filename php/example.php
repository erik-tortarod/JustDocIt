<?php

/**
 * Clase que representa un producto en el sistema
 */
class Product
{
   /**
    * @var int ID único del producto
    */
   private int $id;

   /**
    * @var string Nombre del producto
    */
   private string $name;

   /**
    * @var float Precio del producto
    */
   private float $price;

   /**
    * Constructor de la clase Product
    * 
    * @param int $id ID del producto
    * @param string $name Nombre del producto
    * @param float $price Precio del producto
    */
   public function __construct(int $id, string $name, float $price)
   {
      $this->id = $id;
      $this->name = $name;
      $this->price = $price;
   }

   /**
    * Obtiene el precio del producto con un descuento aplicado
    * 
    * @param float $discount Porcentaje de descuento (0-100)
    * @return float Precio con descuento
    * @throws InvalidArgumentException Si el descuento no está en el rango válido
    */
   public function getDiscountedPrice(float $discount): float
   {
      if ($discount < 0 || $discount > 100) {
         throw new InvalidArgumentException('El descuento debe estar entre 0 y 100');
      }
      return $this->price * (1 - $discount / 100);
   }

   /**
    * Obtiene el nombre del producto
    * 
    * @return string Nombre del producto
    */
   public function getName(): string
   {
      return $this->name;
   }
}
