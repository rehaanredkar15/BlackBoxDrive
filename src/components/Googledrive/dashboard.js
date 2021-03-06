import React from "react";
import Navbar from "./Navbar";
import AddFolderButton from "./AddFolderButton";
import AddFileButton from "./AddFileButton";
import { Container, Jumbotron } from "react-bootstrap";
import { useFolder } from "../hooks/useFolder";
import Folder from "./Folder";
import File from "./File";
import { useParams, useLocation } from "react-router-dom";
import FolderBreadcrumbs from "./FolderBreadcrumbs";
import "../../App.css";
export default function Dashboard() {
  const { folderId } = useParams();
  const { state = {} } = useLocation();
  const { folder, childFolders, childFiles } = useFolder(
    folderId,
    state.folder
  );

  console.log(childFolders.length);
  console.log(childFiles);
  return (
    <>
      <Navbar />
      <Container fluid>
        <div className="d-flex align-items-center ">
          <FolderBreadcrumbs currentFolder={folder} />
          <AddFileButton currentFolder={folder} />
          <AddFolderButton currentFolder={folder} />
        </div>
        {/* <div id="intro" class="view"> */}
        <Jumbotron>
          <div className="text-center">
            <h4 data-text="WELCOME">WELCOME TO BLUEBOX</h4>
            <p className="text-success">Your files are Safe Here</p>
          </div>

          <h5>Your Folders: </h5>
          {childFolders.length > 0 && (
            <div className="d-flex flex-wrap">
              {childFolders.map((childFolder) => (
                <div
                  key={childFolder.id}
                  style={{ maxWidth: "250px" }}
                  className="p-2"
                >
                  <Folder folder={childFolder} />
                </div>
              ))}
            </div>
          )}

          {childFolders.length > 0 && childFiles.length > 0 && <hr />}

          <h5>Your Files: </h5>
          {childFiles.length > 0 && (
            <div className="d-flex flex-wrap">
              {childFiles.map((childFile) => (
                <div
                  key={childFile.id}
                  style={{ maxWidth: "250px" }}
                  className="p-2"
                >
                  <File file={childFile} />
                </div>
              ))}
            </div>
          )}
        </Jumbotron>

        {/* </div> */}
      </Container>
    </>
  );
}
