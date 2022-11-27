import express from "express"
import Menu_Item from "../models/menu_item.model.js"


export const getMenuBySearch = async(req, res) => {
    const searchVal = req.query;
    try {
        const naam = new RegExp(searchVal, 'i');

        const items = await Menu_Item.find({ naam })

        res.json({data: items});
    } catch (error) {
        res.status(404).json({message: error.message});
    }

};