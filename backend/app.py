from fastapi import FastAPI, Request
from fastapi.responses import FileResponse
from starlette.middleware.cors import CORSMiddleware

import modal

web_app = FastAPI()
stub = modal.Stub("doc-draft")
image = modal.Image.debian_slim().pip_install(["python-docx"])
volume = "document-store"

DOC_DIR = "/docs"

web_app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@web_app.post("/generate")
async def generate_docx(request: Request):
    import docx
    doc = docx.Document(f"{DOC_DIR}/NVCA-2020-Right-of-First-Refusal-Template.docx")
    
    templates = await request.json()
    for template in templates:
        if template["doc"] == "rofr":
            for _, config in template["template"].items():
                value = config["value"]
                for position in config["positions"]:
                    paragraph = position["paragraph"]
                    run = position["run"]
                    start = position["runStartStr"]
                    end = position["runEndStr"]
                    text = doc.paragraphs[paragraph].runs[run].text
                    start_index = text.find(start)
                    end_index = text.find(end)
                    if len(start) == 0:
                        doc.paragraphs[paragraph].runs[run].text = value + text[end_index:len(text)]
                    else:
                        doc.paragraphs[paragraph].runs[run].text = text[0:start_index + len(start) + 1] + value + text[end_index:len(text)]
        doc.save(f"{DOC_DIR}/rofr.docx")
    return {"message": "success"}


@web_app.get("/rofr")
def generate_rofr():
    return FileResponse(
        f"{DOC_DIR}/rofr.docx",
        media_type="application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        headers={"Content-Disposition": "attachment; filename=rofr.docx"},
    )


@stub.asgi(
    image=image,
    shared_volumes={DOC_DIR: modal.Secret.from_name(volume)}
)
def fastapi_app():
    return web_app