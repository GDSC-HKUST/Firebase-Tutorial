"use client";
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import style from "../page.module.css";
import Table from "react-bootstrap/Table";
import { auth, db } from "@/firebase/config";
import { useRouter } from "next/navigation";
import { createSuperhero, updateSuperhero, deleteSuperhero } from "../../firebase/crud";
import { getDocs, collection } from "firebase/firestore";

export default function CRUD() {
  const router = useRouter();
  const [valid, setValid] = useState(false);

  const [text, setText] = useState("");
  const [superheroList, setSuperheroList] = useState([]);
  const [ids, setIds] = useState([]);
  const [updateText, setUpdateText] = useState("")

  // Protect your route
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        router.push("/");
      } else {
        setValid(true);
      }
    });
  }, []);

  useEffect(() => {
    const getData = async () => {
      const docSnap = await getDocs(collection(db, "superheroes"));
      var temp = [];
      var tempIds = [];
      docSnap.forEach((doc, id) => {
        // doc.data() is never undefined for query doc snapshots
        temp.push(doc.data());
        tempIds.push(doc.id);
      });
      setSuperheroList(temp);
      setIds(tempIds);
    };
    getData();
  }, []);

  if (!valid) {
    return <>Loading...</>;
  }

  return (
    <div className={style.pageWrapper}>
      <div className={style.loginBox}>
        <h2>CRUD w/ Firebase</h2>
        <br />
        <InputGroup className="mb-3">
          <Form.Control
            placeholder="Name of a superhero"
            onChange={(e) => setText(e.target.value)}
          />
          <Button
            variant="outline-secondary"
            id="button-addon2"
            onClick={() => createSuperhero(text)}
          >
            Add
          </Button>
        </InputGroup>
        <br />
        <Table striped>
          <thead>
            <tr>
              <th>#</th>
              <th>Superhero name</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {superheroList.map((i, index) => {
              return (
                <tr>
                  <td>{ids[index]}</td>
                  <td>{i.name}</td>
                  <td>
                    <InputGroup className="mb-3">
                      <Form.Control onChange={(e) => setUpdateText(e.target.value)}/>
                      <Button variant="warning" 
                      onClick={() => updateSuperhero(ids[index], updateText)}
                      >Update</Button>
                    </InputGroup>
                  </td>
                  <td>
                    <Button variant="danger"
                      onClick={() => deleteSuperhero(ids[index])}
                    >Delete</Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
