import React from "react";

import Button from "react-md/src/js/Buttons";
import DataTable, { TableBody } from "react-md/src/js/DataTables";
import SVGIcon from "react-md/src/js/SVGIcons";

import LinkModal from "./LinkModal";
import ContentRow from "./ContentRow";

import githubCircle from "icons/github-circle.svg";
import heart from "icons/heart.svg";
import school from "icons/school.svg";
import uwesciencelogo from "images/uwescience.jpg";
import wsdotlogo from "images/wsdot.png";

interface Props {
  onClose(): void;
}

const AboutLinkModal = ({ onClose }: Props) => (
  <LinkModal title="About" onClose={onClose}>
    <DataTable plain responsive>
      <TableBody>
        <ContentRow
          buttons={
            <Button
              icon
              svg
              href="https://github.com/accessmap"
              target="_blank"
            >
              <SVGIcon use={githubCircle.url} />
            </Button>
          }
          label={"AccessMap is an open source project."}
        />
        <ContentRow
          buttons={
            <Button
              icon
              svg
              href="https://tcat.cs.washington.edu/"
              target="_blank"
            >
              <SVGIcon use={school.url} />
            </Button>
          }
          label="AccessMap is developed via the Taskar Center at the University of Washington."
        />
        <ContentRow
          buttons={[
            <a
              className="md-inline-block"
              key="uwescience"
              href="http://escience.washington.edu/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img alt="UW eScience" src={uwesciencelogo} height={32} />
            </a>,
            <a
              className="md-inline-block"
              key="wsdot"
              href="http://www.wsdot.wa.gov/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img alt="Washington DOT" src={wsdotlogo} height={16} />
            </a>,
          ]}
          label="AccessMap has received support from many organizations."
        />
        <ContentRow
          buttons={
            <Button
              icon
              svg
              href="https://www.washington.edu/giving/make-a-gift/?page=funds&source_typ=3&source=TASKAR"
              target="_blank"
            >
              <SVGIcon error use={heart.url} />
            </Button>
          }
          label="Contribute to AccessMap development by donating to the Taskar Center. Mention AccessMap in the comment."
        />
      </TableBody>
    </DataTable>
  </LinkModal>
);

export default AboutLinkModal;
