"use client";
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import style from "../page.module.css";
import Table from "react-bootstrap/Table";

export default function CRUD() {
  // How to protect your route/page?

  return (
    <div className={style.pageWrapper}>
      <div className={style.loginBox}>
        <h2>CRUD w/ Firebase</h2>
        <br />
        <InputGroup className="mb-3">
          <Form.Control placeholder="Name of a superhero" />
          <Button variant="outline-secondary" id="button-addon2">
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
            <tr>
              <td>1</td>
              <td>Wonder Woman</td>
              <td>
                <InputGroup className="mb-3">
                  <Form.Control />
                  <Button variant="warning">Update</Button>
                </InputGroup>
              </td>
              <td>
                <Button variant="danger">Delete</Button>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
}
