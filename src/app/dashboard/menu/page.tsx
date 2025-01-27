"use client";
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MdEdit, MdDelete } from "react-icons/md";
import { Pencil, SquareMenu, Trash2 } from "lucide-react";

// Sample menu data
const menuData = [
  {
    category: "Drinks",
    items: [
      { name: "Coca-Cola", price: 200 },
      { name: "Fanta", price: 400 },
      { name: "Sprite", price: 300 },
    ],
  },
  {
    category: "Main Dishes",
    items: [
      { name: "Hamburger", price: 800 },
      { name: "Pizza", price: 1200 },
      { name: "Pasta", price: 900 },
    ],
  },
  {
    category: "Desserts",
    items: [
      { name: "Cheesecake", price: 500 },
      { name: "Ice Cream", price: 350 },
      { name: "Tiramisu", price: 600 },
    ],
  },
];

const Page = () => {
  const [newItem, setNewItem] = useState({ name: "", price: 0 });
  const [selectedCategory, setSelectedCategory] = useState(0);

  const handleAddItem = () => {
    // Add new item logic
    console.log("Add new item:", newItem);
  };

  const handleEditItem = (item: any) => {
    // Edit item logic
    console.log("Edit item:", item);
  };

  const handleDeleteItem = (item: any) => {
    // Delete item logic
    console.log("Delete item:", item);
  };

  return (
    <div className="w-full flex-1 overflow-x-auto p-4">
      <section className="flex justify-between">
        <h3 className="text-lg font-semibold">All Admins</h3>

        <Button Icon={SquareMenu} className="flex items-center space-x-2">
          Add new Staff
        </Button>
      </section>

      <div className="mt-6 space-y-6">
        {menuData.map((item, i) => (
          <div
            key={i}
            className="flex w-full items-center justify-between rounded border p-4 shadow shadow-gray-200/20"
          >
            <div>{item.category}</div>
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center rounded-full bg-primary p-2 text-white">
                <Trash2 className="size-4" />
              </div>
              <div className="flex items-center justify-center rounded-full bg-primary p-2 text-white">
                <Pencil className="size-4" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
